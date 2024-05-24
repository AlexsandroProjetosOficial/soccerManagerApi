import type { IGameDetails } from "./IGameDetails";
import type { IGames } from "./IGames";
import type { IGetGameRequest } from "./IGetGameRequest";
import type { IGetOfficialsRequest } from "./IGetOfficialsRequest";
import type { IOfficials } from "./IOfficials";
import type { IPostDetailsGameRequest } from "./IPostDetailsGameRequest";
import type { ITimesGame } from "./ITimesGame";
import type { IUpdateGameDetailRepositoryRequest } from "./IUpdateGameDetailRepositoryRequest";
import type { IUpdateGameDetailRequest } from "./IUpdateGameDetailRequest";
import type { IUpdateGameRequest } from "./IUpdateGameRequest";
import type { IUpdateOfficialRequest } from "./IUpdateOfficialRequest";

interface IGameRepository {
  findGamesByUserId(props: IGetGameRequest): Promise<Array<IGames>>;
  findOfficialsByGameId(props: IGetOfficialsRequest): Promise<Array<IOfficials>>;
  findTimesByGameId(props: string): Promise<ITimesGame | null>;
  findGameDetailsByGameId(props: string): Promise<IGameDetails | null>;
  updateOfficialById(props: IUpdateOfficialRequest): Promise<boolean>;
  updateGameById(props: IUpdateGameRequest): Promise<boolean>;
  postGameDetailsByGameId(props: IPostDetailsGameRequest): Promise<boolean>;
  deleteGameDetailByDetalID(props: string): Promise<boolean>;
  updateGameDetailById(props: IUpdateGameDetailRepositoryRequest): Promise<boolean>;
};

export type { IGameRepository };