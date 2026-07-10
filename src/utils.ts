let _ctx: CanvasRenderingContext2D | null | undefined;

function getContext(): CanvasRenderingContext2D | null {
    if (_ctx === undefined) {
        const c = document.createElement("canvas");
        c.width = 1;
        c.height = 1;
        _ctx = c.getContext("2d");
    }
    return _ctx;
}

function parseHex(hex: string): string | null {
    const m = hex.match(/^#([0-9a-f]{3,8})$/i);
    if (!m) return null;
    let h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length !== 6 && h.length !== 8) return null;
    return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

export function resolveColor(input: string): string | null {
    if (!input) return null;

    if (/^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/.test(input)) {
        return input;
    }

    if (input.startsWith("#")) {
        return parseHex(input);
    }

    const ctx = getContext();
    if (!ctx) return null;

    const sentinel = "#010203";
    ctx.fillStyle = sentinel;
    ctx.fillStyle = input;

    if (ctx.fillStyle === sentinel && input.toLowerCase() !== sentinel) {
        return null;
    }

    const resolved = ctx.fillStyle;

    if (resolved.startsWith("#")) {
        return parseHex(resolved);
    }

    const m = resolved.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
    return m ? `${m[1]}, ${m[2]}, ${m[3]}` : null;
}
