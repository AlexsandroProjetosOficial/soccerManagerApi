import moment from "moment";
import { AppError } from "../../../errors/AppErrors";
import type { IDetails } from "../../../interfaces/game/IDetails";
import type { IGetOfficialsRequest } from '../../../interfaces/game/IGetOfficialsRequest';
import type { IOfficials } from '../../../interfaces/game/IOfficials';
import type { IOfficialsResponse } from '../../../interfaces/game/IOfficialsResponse';
import type { IUpdateGameDetailRequest } from "../../../interfaces/game/IUpdateGameDetailRequest";
import type { IUpdateOfficialRequest } from "../../../interfaces/game/IUpdateOfficialRequest";
import { GameRepository } from "../../../repositories/game.repository";

class UpdateGameDetailUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute({
    game,
    gameDetail,
    column,
    value
  }: IUpdateGameDetailRequest): Promise<IDetails | void> {
    try {
      const isGameDetailUpdated = await this.gameRepository.updateGameDetailById({ gameDetail, column, value });

      if (!isGameDetailUpdated) throw new AppError({ message: 'Não foi possivel atualizar o detalhe da partida.', statusCode: 400, errors: [] });

      console.log(game);
      const gameDetails = await this.gameRepository.findGameDetailsByGameId(game);

      console.log(gameDetails);
      const details = {
        home: {
          teamId: gameDetails?.team_home.id,
          avatar: gameDetails?.team_home.avatar,
          name: gameDetails?.team_home.name,
          cards: gameDetails?.team_home.Game_detail.filter(card => ['yellow_card', 'red_card'].includes(card.type)).map(item => {
            return {
              id: item.id,
              type: item.type,
              playerNumber: item.player_number_one,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          }),
          goals: gameDetails?.team_home.Game_detail.filter(goal => ['goal'].includes(goal.type)).map(item => {
            return {
              id: item.id,
              playerNumber: item.player_number_one,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          }),
          substitutions: gameDetails?.team_home.Game_detail.filter(substituiton => ['substitution'].includes(substituiton.type)).map(item => {
            return {
              id: item.id,
              stop: item.stop,
              playerIn: item.player_number_one,
              playerOut: item.player_number_two,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          })
        },
        away: {
          teamId: gameDetails?.team_away.id,
          avatar: gameDetails?.team_away.avatar,
          name: gameDetails?.team_away.name,
          cards: gameDetails?.team_away.Game_detail.filter(card => ['yellow_card', 'red_card'].includes(card.type)).map(item => {
            return {
              id: item.id,
              type: item.type,
              playerNumber: item.player_number_one,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          }),
          goals: gameDetails?.team_away.Game_detail.filter(goal => ['goal'].includes(goal.type)).map(item => {
            return {
              id: item.id,
              playerNumber: item.player_number_one,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          }),
          substitutions: gameDetails?.team_away.Game_detail.filter(substituiton => ['substitution'].includes(substituiton.type)).map(item => {
            return {
              id: item.id,
              stop: item.stop,
              playerIn: item.player_number_one,
              playerOut: item.player_number_two,
              period: item.first_half ? 'firstHalf' : 'secondHalf',
              time: moment.utc(item.time).format('mm:ss'),
              isConfirmed: Boolean(item.is_confirmed)
            }
          })
        }
      }

      console.log('details', details);

      return details;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { UpdateGameDetailUseCase };
