// src/lib/utils.js

/**
 * Utility function to combine class names conditionally.
 * 
 * @param {...any} classes - The class names to combine.
 * @returns {string} - The combined class name string.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
