/**
 * Remove empty, null, undefined, and empty string values from an object
 *
 * @param obj - The object to clean
 * @returns A new object with empty fields removed
 *
 * @example
 * ```ts
 * removeEmptyFields({
 *   name: "John",
 *   email: "",
 *   age: null,
 *   active: true,
 * })
 * // Returns: { name: "John", active: true }
 * ```
 */
export function removeEmptyFields<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip null, undefined, and empty strings
    if (value === null || value === undefined || value === "") {
      continue;
    }

    // Skip empty objects (but keep arrays)
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value as Record<string, unknown>).length === 0
    ) {
      continue;
    }

    cleaned[key] = value;
  }

  return cleaned as Partial<T>;
}

/**
 * @deprecated Use removeEmptyFields instead (camelCase naming convention)
 */
export const RemoveEmptyFields = removeEmptyFields;
