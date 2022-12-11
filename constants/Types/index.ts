export interface ModelTestSchedule {
  id: number;
  model_test_id: number;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  rescheduled: boolean;
}

export interface ModelTestSubject {
  id: number;
  name: string;
  pivot: {
    subject_id: number;
    model_test_id: number;
  };
}
