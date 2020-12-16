function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      if (data.joinGame(d.roomId, d.playerId)) {
        socket.emit('collectorsInitialize', {
            labels: data.getUILabels(d.roomId),
            players: data.getPlayers(d.roomId),
            itemsOnSale: data.getItemsOnSale(d.roomId),
            marketValues: data.rooms[d.roomId].market,
            skillsOnSale: data.getSkillsOnSale(d.roomId),
            auctionCards: data.getAuctionCards(d.roomId),
            placements: data.getPlacements(d.roomId),
            playerList: data.rooms[d.roomId].playerList,
            round: data.rooms[d.roomId].round,
            twoMarket: data.rooms[d.roomId].twoMarket,
            twoMarketCounter: data.rooms[d.roomId].twoMarketCounter
          }
        );

      }
      socket.emit('playerJoined',{
        players: data.getPlayers(d.roomId)
      })
    });
    socket.on('collectorsDrawCard', function(d) {
      io.to(d.roomId).emit('collectorsCardDrawn',
        data.drawCard(d.roomId, d.playerId)
      );
    });
    socket.on('collectorsSkipThisRound', function(d) {
      io.to(d.roomId).emit('collectorsRoundSkipped',
        data.skipThisRound(d.roomId, d.playerId)
      );
    });
    socket.on('collectorsBuyCard', function(d) {
      data.buyCard(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('collectorsCardBought', {
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          itemsOnSale: data.getItemsOnSale(d.roomId)
        }
      );
    });
    socket.on('collectorsBuySkill', function(d){
      data.buySkill(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('collectorsSkillBought',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId)
      }
    );
    });
    socket.on('collectorsPlaceBottle', function(d) {
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.twoMarket);
      io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId)
      );
    });
    socket.on('collectorsStartAuction', function(d) {
      data.startAuction(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('auctionStarted', {
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId)
        }
      );
    });

    socket.on('collectorsRaiseBid', function(d) {
      data.raiseBid(d.roomId, d.playerId, d.currentBid)
      io.to(d.roomId).emit('bidRaised', {
          players: data.getPlayers(d.roomId),
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });
    socket.on('collectorsSkipBidding', function(d) {
      data.skipBidding(d.roomId, d.playerId, d.currentBid, d.currentAuctionCard, d.bidWinnerWrapper)
      io.to(d.roomId).emit('bidSkipped', {
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          bidSkippersCount: data.getBidSkippersCount(d.roomId),
          currentBid: data.getCurrentBid(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId)
        }
      );
    });
    socket.on('collectorsPlaceInItems', function(d) {
      data.placeInItems(d.roomId, d.playerId, d.currentAuctionCard)
      io.to(d.roomId).emit('auctionCardPlacedInItems', {
          players: data.getPlayers(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId),
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });
    socket.on('collectorsPlaceInSkills', function(d) {
      data.placeInSkills(d.roomId, d.playerId, d.currentAuctionCard)
      io.to(d.roomId).emit('auctionCardPlacedInSkills', {
          players: data.getPlayers(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId),
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });

    socket.on('collectorsRaiseValue', function(d){
      data.raiseMarket(d.roomId, d.playerId, d.card,d.cost,d.action)
      io.to(d.roomId).emit('ValueRaised',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        marketValues: data.rooms[d.roomId].market,
        skillsOnSale: data.rooms[d.roomId].skillsOnSale,
        auctionCards: data.rooms[d.roomId].auctionCards
      });
    });
    socket.on('collectorsChangeTurn',function(d){
      data.changeTurn(d.roomId,d.playerId)
      io.to(d.roomId).emit('turnChanged',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId)
      });
    });


    socket.on('collectorsChangeRound',function(d){
      data.changeRound(d.roomId,d.playerId)
      io.to(d.roomId).emit('roundChanged',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        round: data.rooms[d.roomId].round,
        playerList: data.rooms[d.roomId].playerList,
        market: data.rooms[d.roomId].market,
        skillsOnSale: data.rooms[d.roomId].skillsOnSale,
        auctionCards: data.rooms[d.roomId].auctionCards,
        itemsOnSale:  data.rooms[d.roomId].itemsOnSale,
        placements: data.getPlacements(d.roomId)
      });
    });
    socket.on('collectorsStartIncome',function(d){
      data.startIncome(d.roomId)
      io.to(d.roomId).emit('incomeStarted',{
        players:  data.getPlayers(d.roomId),
        incomePhase: data.rooms[d.roomId].incomePhase
      });
    });

    socket.on('collectorsSetIncome', function(d){
      data.getIncome(d.drawOneCard, d.oneIncome, d.twoIncome, d.roomId,d.playerId)
      io.to(d.roomId).emit('incomeGotten',{
        players: data.getPlayers(d.roomId)
      });
    });


}

module.exports = sockets;
