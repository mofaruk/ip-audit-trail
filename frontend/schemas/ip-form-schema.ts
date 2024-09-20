import { z } from 'zod';

export const ipFormSchema = z.object({
    ip: z.string().min(1, {
        message: 'Ip is required',
    }),
    label: z.string().min(1, {
        message: 'Label is required',
    }),
    comment: z.string().min(1, {
        message: 'Comment is required',
    }),
});
