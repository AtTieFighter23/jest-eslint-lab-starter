const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('Utility Functions', () => {

    // ==================== capitalizeWords ====================
    describe('capitalizeWords', () => {
        test('should capitalize first letter of each word', () => {
            expect(capitalizeWords("hello world")).toBe("Hello World");
        });

        test('should handle single word', () => {
            expect(capitalizeWords("javascript")).toBe("Javascript");
        });

        test('should handle empty string', () => {
            expect(capitalizeWords("")).toBe("");
        });

        test('should handle string with special characters', () => {
            expect(capitalizeWords("hello-world")).toBe("Hello-World");
        });

        test('should return empty string for non-string input', () => {
            expect(capitalizeWords(null)).toBe("");
            expect(capitalizeWords(undefined)).toBe("");
        });
    });

    // ==================== filterActiveUsers ====================
    describe('filterActiveUsers', () => {
        test('should return only active users', () => {
            const users = [
                { name: "Alice", isActive: true },
                { name: "Bob", isActive: false },
                { name: "Charlie", isActive: true }
            ];
            expect(filterActiveUsers(users)).toEqual([
                { name: "Alice", isActive: true },
                { name: "Charlie", isActive: true }
            ]);
        });

        test('should return empty array when all users are inactive', () => {
            const users = [
                { name: "Bob", isActive: false },
                { name: "Dave", isActive: false }
            ];
            expect(filterActiveUsers(users)).toEqual([]);
        });

        test('should return empty array for empty input', () => {
            expect(filterActiveUsers([])).toEqual([]);
        });

        test('should return empty array for non-array input', () => {
            expect(filterActiveUsers(null)).toEqual([]);
            expect(filterActiveUsers(undefined)).toEqual([]);
        });
    });

    // ==================== logAction ====================
    describe('logAction', () => {
        test('should generate correct log message', () => {
            const result = logAction("login", "Alice");
            expect(result).toMatch(/User Alice performed login at \d{4}-\d{2}-\d{2}T/);
            expect(result).toContain("Z"); // ISO format ends with Z
        });

        test('should handle empty strings', () => {
            expect(logAction("", "")).toMatch(/User  performed  at /);
        });

        test('should return error message for invalid input', () => {
            expect(logAction(null, "Alice")).toBe("Invalid input");
            expect(logAction("login", null)).toBe("Invalid input");
        });
    });
});