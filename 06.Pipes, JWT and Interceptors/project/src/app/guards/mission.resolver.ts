import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { Mission } from "../interfaces/mission.interface"
import { MissionsService } from "../services/missions.service";

export const missionResolver: ResolveFn<Mission | undefined> = (route, state) => {
    const missionsService = inject(MissionsService);

    const idParam = route.paramMap.get('id');
    const missionId = idParam ? parseInt(idParam, 10) : 0;

    return missionsService.getMissionById(missionId);
}