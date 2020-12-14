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
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.twoMarket);
      io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId)
      );
    });


    socket.on('collectorsSendMessage', function(d) {
      data.addMessage(d.roomId, d.playerId, d.msg);
      io.to(d.roomId).emit('collectorsUpdateMessages', {
        messages: data.getMessages(d.roomId)
      })
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
    socket.on('collectorsRaiseValue', function(d){
      data.raiseMarket(d.roomId, d.playerId, d.card,d.cost,d.action)
      socket.emit('ValueRaised',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        marketValues: data.rooms[d.roomId].market,
        skillsOnSale: data.rooms[d.roomId].skillsOnSale,
        auctionCards: data.rooms[d.roomId].auctionCards
      })
    });

      socket.on('sendPlayerName', function(d){
        data.setPlayerName(d.roomId, d.playerId, d.playerName)
        socket.emit('nameSet',{
          players: data.getPlayers(d.roomId),
          playerId: d.playerId,
          playerName: d.playerName
      })
      console.log(d.playerName, " from socket listener")
    });



}

module.exports = sockets;
