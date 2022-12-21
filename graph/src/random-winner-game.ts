import { BigInt } from "@graphprotocol/graph-ts";
import { 
  PlayerJoined,
  GameEnded,
  GameStarted,
  OwnershipTransferred
} from "../generated/RandomWinnerGame/RandomWinnerGame";
import { Game } from "../generated/schema";

export function handleGameEnded(event: GameEnded): void {
  let entity = Game.load(event.params.gameId.toString());

  //check if the entity exists
  if (!entity) {
    return;
  }
  entity.winner = event.params.winner;
  entity.requestId = event.params.requestId;

  //save entity to the store
  entity.save();
}

export function handlePlayerJoined(event: PlayerJoined): void {
  // load entity from the store
  let entity = Game.load(event.params.gameId.toString());
  
  //check for existence of entity
  if (!entity) {
    return;
  }

  let newPlayers = entity.players;
  newPlayers.push(event.params.player);
  entity.players = newPlayers;
  entity.save();//save entity to the store
}

export function handleGameStarted(event: GameStarted): void {
  let entity = Game.load(event.params.gameId.toString());

  if(!entity) {
    entity = new Game(event.params.gameId.toString());
    entity.players = [];
  }
  entity.maxPlayers = event.params.maxPlayers;
  entity.entryFee = event.params.entryFee;
  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}