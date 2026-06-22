// Export shared types here
export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface Appointment {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
  meetingRoom?: string;
  userData: any;
  docData: any;
}

export interface Review {
  _id: string;
  docId: string;
  userId: string;
  appointmentId: string;
  rating: number;
  reviewText: string;
  date: number;
}
