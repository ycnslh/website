import type { ShikiTransformer } from 'shiki'
import { h } from 'hastscript'

/**
 * Parse meta string from code block (e.g., title="example.js")
 */
function parseMetaString(str = '') {
  return Object.fromEntries(
    str.split(' ').reduce((acc: [string, string | true][], cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/)
      if (matched === null) return acc
      const key = matched[1]
      const value = matched[3] || matched[4] || true
      acc = [...acc, [key, value]]
      return acc
    }, [])
  )
}

/**
 * Transformer: Wraps code block in nested div > pre > code structure
 * This allows for absolute positioning of title, language badge, and copy button
 */
export const updateStyle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-update-style',
    pre(node) {
      const container = h('pre', node.children)
      node.children = [container]
      node.tagName = 'div'
    }
  }
}

/**
 * Transformer: Adds title bar to code blocks
 * Usage: ```js title="example.js"
 */
export const addTitle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-title',
    pre(node) {
      const rawMeta = this.options.meta?.__raw
      if (!rawMeta) return
      const meta = parseMetaString(rawMeta)

      if (!meta.title) return

      const div = h(
        'div',
        {
          class: 'code-title'
        },
        meta.title.toString()
      )
      node.children.unshift(div)
    }
  }
}

/**
 * Transformer: Adds language badge to top-right corner
 */
export const addLanguage = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-language',
    pre(node) {
      const span = h(
        'span',
        {
          class: 'code-language'
        },
        this.options.lang
      )
      node.children.push(span)
    }
  }
}

/**
 * Transformer: Adds copy button with success state
 * @param timeout - Duration in ms to show success state (default: 2000)
 */
export const addCopyButton = (timeout?: number): ShikiTransformer => {
  const toggleMs = timeout || 2000

  return {
    name: 'shiki-transformer-copy-button',
    pre(node) {
      const button = h(
        'button',
        {
          class: 'code-copy-button',
          'data-code': this.source,
          onclick: `
            navigator.clipboard.writeText(this.dataset.code);
            this.classList.add('copied');
            setTimeout(() => this.classList.remove('copied'), ${toggleMs})
          `
        },
        [
          h('div', { class: 'copy-icon-ready' }, [
            h('svg', { class: 'copy-icon', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' }, [
              h('use', { href: '/icons/code.svg#clipboard' })
            ])
          ]),
          h('div', { class: 'copy-icon-success' }, [
            h('svg', { class: 'copy-icon', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' }, [
              h('use', { href: '/icons/code.svg#check' })
            ])
          ])
        ]
      )
      node.children.push(button)
    }
  }
}

/**
 * Transformer: Notation diff support
 * Usage: // [!code ++] or // [!code --]
 */
export const transformerNotationDiff = (): ShikiTransformer => {
  const pattern = /\[!code (--|\+\+)\]/

  return {
    name: 'shiki-transformer-notation-diff',
    line(node, line) {
      const nodeText = node.children
        .filter(child => child.type === 'text')
        .map(child => ('value' in child ? child.value : ''))
        .join('')

      const match = nodeText.match(pattern)
      if (!match) return

      const type = match[1] === '++' ? 'add' : 'remove'
      this.addClassToHast(node, `diff ${type}`)

      // Remove the notation comment from display
      node.children = node.children.filter(child => {
        if (child.type === 'text' && 'value' in child) {
          child.value = child.value.replace(pattern, '')
          return child.value.trim() !== ''
        }
        return true
      })
    },
    pre(node) {
      const hasDiff = node.children.some(child =>
        child.type === 'element' &&
        child.properties?.className?.toString().includes('diff')
      )
      if (hasDiff) {
        this.addClassToHast(node, 'has-diff')
      }
    }
  }
}

/**
 * Transformer: Notation highlight support
 * Usage: // [!code highlight]
 */
export const transformerNotationHighlight = (): ShikiTransformer => {
  const pattern = /\[!code (highlight|hl)\]/

  return {
    name: 'shiki-transformer-notation-highlight',
    line(node, line) {
      const nodeText = node.children
        .filter(child => child.type === 'text')
        .map(child => ('value' in child ? child.value : ''))
        .join('')

      const match = nodeText.match(pattern)
      if (!match) return

      this.addClassToHast(node, 'highlighted')

      // Remove the notation comment from display
      node.children = node.children.filter(child => {
        if (child.type === 'text' && 'value' in child) {
          child.value = child.value.replace(pattern, '')
          return child.value.trim() !== ''
        }
        return true
      })
    },
    pre(node) {
      const hasHighlight = node.children.some(child =>
        child.type === 'element' &&
        child.properties?.className?.toString().includes('highlighted')
      )
      if (hasHighlight) {
        this.addClassToHast(node, 'has-highlighted')
      }
    }
  }
}