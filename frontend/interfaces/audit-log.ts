type Change = {
    ip?: string
    label?: string
    comment?: string
    user_id?: string
    updated_at: string
    created_at: string
    id: string
}

export default interface AuditLog {
    id: string;
    ip: string,
    modified_by: bigint,
    session_id: string,
    event: string,
    changes: Change,
    updated_at: string,
    created_at: string,
}