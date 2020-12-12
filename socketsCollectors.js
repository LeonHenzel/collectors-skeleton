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
            marketValues: data.getMarketValues(d.roomId),
            skillsOnSale: data.getSkillsOnSale(d.roomId),
            auctionCards: data.getAuctionCards(d.roomId),
            placements: data.getPlacements(d.roomId)
          }
        );
      }
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
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost);
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
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });
    socket.on('collectorsSkipBidding', function(d) {
      data.skipBidding(d.roomId, d.playerId, d.currentBid, d.currentAuctionCard)
      io.to(d.roomId).emit('bidRaised', { 
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });
}

module.exports = sockets;