import { fetch } from "../util";

import type {
  ApiTournament,
  BaseResponse,
  ApiMatch,
  Result,
  Tournament,
  Tournaments,
} from "..";
import type { WithApiKey } from "../types/util";

export interface TournamentOptions extends WithApiKey {
  /**
   * Tournament ID
   */
  id?: string;
}

interface ApiTournamentResponse extends BaseResponse {
  /**
   * Data about a specified tournament
   *
   * @see https://documentation.pubg.com/en/tournaments-endpoint.html
   */
  data: ApiTournament;

  /**
   * Matches related to the selected tournament
   */
  included: Array<Pick<ApiMatch, "attributes" | "id" | "type">>;
}

export type TournamentResponse = Result<Tournament | Array<Tournaments>>;

/**
 * Gets a specific tournament using a provided match id
 *
 * @param {Object} options - Tournament Options
 * @param {string} options.apiKey - PUBG Developer API key
 * @param {string} options.id - Tournament ID
 */
export async function getTournament({
  apiKey,
  id,
}: TournamentOptions): TournamentResponse {
  const response = await fetch<ApiTournamentResponse>({
    apiKey,
    endpoint: `tournaments/${id}`,
    root: true,
  });

  if ("error" in response) return response;

  return {
    ...response.data,
    matches: response.included,
  };
}
