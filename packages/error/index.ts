export class AppError extends Error {
    public readonly isOperational: boolean;
    public readonly statusCode: number;
    public readonly details?: any;

    constructor(message: string, statusCode = 500, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this);
        }
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 404, true, details);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, true, details);
    }
}

export class DatabaseError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 500, true, details);
    }
}

export class ConflictError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 409, true, details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 401, true, details);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 403, true, details);
    }
}

export class ExternalServiceError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 502, true, details);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 500, true, details);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, true, details);
    }
}

export class AuthError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 401, true, details);
    }
}

// Additional custom error classes can be added here as needed
export class CustomError extends AppError {
    constructor(message: string, statusCode: number, details?: any) {
        super(message, statusCode, true, details);
    }
}