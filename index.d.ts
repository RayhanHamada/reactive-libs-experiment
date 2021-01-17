

declare namespace JSX {

    type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K]
    }
}