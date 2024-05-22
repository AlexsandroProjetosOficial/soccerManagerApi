import { AppError } from "../../../errors/AppErrors";
import type { IGetOfficialsRequest } from '../../../interfaces/game/IGetOfficialsRequest';
import type { IOfficials } from '../../../interfaces/game/IOfficials';
import type { IOfficialsResponse } from '../../../interfaces/game/IOfficialsResponse';
import { GameRepository } from "../../../repositories/game.repository";

class GetOfficialsUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute({
    game
  }: IGetOfficialsRequest): Promise<Array<IOfficialsResponse> | void> {
    try {
      const officials: Array<IOfficials> = await this.gameRepository.findOfficialsByGameId({ game });

      const newOfficials = officials.map(official => {
        return {
          id: official.id,
          isTime: !!official.referee_arrival_time,
          avatar: official.referee.avatar,
          name: official.referee.name,
          phone: official.referee.phone,
          position: official.referee.position
        }
      })

      return newOfficials;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { GetOfficialsUseCase };
