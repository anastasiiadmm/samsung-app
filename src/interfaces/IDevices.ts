export interface IDevices {
  id: number;
  created_at: string;
  updated_at: string;
  imei: string;
  imei2: string;
  serial_number: string;
  object_id: string;
  model: string;
  status: string;
  is_blocked: boolean;
  is_deleted: boolean;
  sim_card_number: string;
  payment_status: number;
  metadata: Record<string, any>;
  company: number;
}

export interface pagination {
  count: number | undefined;
  next: string | null | undefined;
  previous: string | null | undefined;
}
