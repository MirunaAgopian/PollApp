export interface Question {
    id: string;
    created_at: string;
    survey_id: string;
    text: string;
    allow_multiple: boolean;
    order_index: number;
}