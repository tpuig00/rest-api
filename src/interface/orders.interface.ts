export interface Orders {
    id: number;
    id_tienda: number;
    id_customer: number;
    nuevo: boolean | null;
    email: string | null;
    tlf: string | null;
    shipping_address_index: string | null;
    total: number | null;
}