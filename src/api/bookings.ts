import { apiFetch } from './client';

export type Booking = {
  id: number;
  name: string;
  guestCount: number;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
};

type BookingPayload = {
  name: string;
  guestCount: number;
  notes: string;
};

export async function fetchBookings(): Promise<Booking[]> {
  return apiFetch<Booking[]>('/bookings?_sort=id&_order=desc');
}

export async function createBooking(payload: BookingPayload): Promise<Booking> {
  return apiFetch<Booking>('/bookings', {
    method: 'POST',
    json: withTimestamp(payload, { includeCreatedAt: true }),
  });
}

export async function updateBooking(
  id: number,
  payload: BookingPayload,
  existing?: Booking | null,
): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`, {
    method: 'PUT',
    json: {
      ...withTimestamp(payload, { includeCreatedAt: false }),
      ...(existing?.createdAt ? { createdAt: existing.createdAt } : {}),
    },
  });
}

export async function deleteBooking(id: number): Promise<void> {
  await apiFetch<void>(`/bookings/${id}`, {
    method: 'DELETE',
  });
}

function withTimestamp(
  payload: BookingPayload,
  options: { includeCreatedAt: boolean },
) {
  const timestamp = new Date().toISOString();
  return {
    ...payload,
    ...(options.includeCreatedAt ? { createdAt: timestamp } : {}),
    updatedAt: timestamp,
  };
}
