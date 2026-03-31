import { Mission } from "../interfaces/mission.interface";

export interface MissionState {
    missions: Mission[];
    isLoading: boolean;
    error: string | null;
}