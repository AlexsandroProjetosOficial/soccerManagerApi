import moment from 'moment';
import { AppError } from "../../../errors/AppErrors";
import type { IDeleteGameDetailRequest } from '../../../interfaces/game/IDeleteGameDetailRequest';
import type { IDetails } from '../../../interfaces/game/IDetails';
import { GameRepository } from "../../../repositories/game.repository";

class DeleteDetailGameUseCase {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository()
  }

  async execute({ detailGame, game }: IDeleteGameDetailRequest): Promise<IDetails | undefined> {
    try {
      console.log(detailGame);
      const isGameDetail = await this.gameRepository.deleteGameDetailByDetalID(detailGame);

      if (!isGameDetail) throw new AppError({ message: 'Não foi possivel deletar o detalhe da partida.', statusCode: 400, errors: [] });

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

export { DeleteDetailGameUseCase };
