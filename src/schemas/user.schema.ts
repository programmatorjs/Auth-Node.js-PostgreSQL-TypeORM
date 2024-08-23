import {object, string, TypeOf, z} from 'zod'
import {RoleEnumType} from "../entities/user.entity";


export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({
            required_error: 'Please confirm your password',
        }),
        role: z.optional(z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Please confirm your password',
    }),
})

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password must be more than 8 characters')
    })
})

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>['body'],
    'passwordConfirm'
>

export  type  LoginUserInput = TypeOf<typeof loginUserSchema>['body']