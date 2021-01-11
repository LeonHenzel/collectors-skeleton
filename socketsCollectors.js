function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      if (data.joinGame(d.roomId, d.playerId)) {
        io.to(d.roomId).emit('collectorsInitialize', {
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
            twoMarketCounter: data.rooms[d.roomId].twoMarketCounter,
            isPlacedList: data.rooms[d.roomId].isPlacedList,
            discardTwo: data.rooms[d.roomId].discardTwo,
            allPlayersIn: data.rooms[d.roomId].allPlayersIn,
            allPlayersReady: data.rooms[d.roomId].allPlayersReady,
            playerCount: data.rooms[d.roomId].playerCount,
            placementInfo: data.rooms[d.roomId].placementInfo,
            twoTimesMarket: data.rooms[d.roomId].twoTimesMarket,
            choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
          }
        );
      }
    });


    socket.on('allAreReady',function(d){
      data.allReady(d.roomId)
      io.to(d.roomId).emit('setUpFixed',{
        players: data.getPlayers(d.roomId),
        allPlayersReady: data.rooms[d.roomId].allPlayersReady
      })
    });

    socket.on('chooseSecretCard',function(d){
      data.setSecret(d.roomId,d.playerId,d.card)
      io.to(d.roomId).emit('secretChoosen',{
        players: data.getPlayers(d.roomId)
      })
    });

    socket.on('playerIsReady',function(d){
      data.isReady(d.roomId,d.playerId)
      io.to(d.roomId).emit('readyStatusChanged',{
        players: data.getPlayers(d.roomId)
      })
    });

    socket.on('collectorsSetDiscardTwoTrue',function(d){
      data.discardTwoTrue(d.roomId)
      io.to(d.roomId).emit('discardTwoIsTrue',{
        discardTwo: data.rooms[d.roomId].discardTwo
      });
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
          itemsOnSale: data.getItemsOnSale(d.roomId),
          isPlacedList: data.rooms[d.roomId].isPlacedList,
          choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
        }
      );
    });
    socket.on('collectorsBuySkill', function(d){
      data.buySkill(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('collectorsSkillBought',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        isPlacedList: data.rooms[d.roomId].isPlacedList,
        choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
      }
    );
    });
    socket.on('collectorsPlaceBottle', function(d) {
      data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.twoMarket);
      io.to(d.roomId).emit('collectorsBottlePlaced',{
      placements: data.getPlacements(d.roomId),
      isPlacedList: data.rooms[d.roomId].isPlacedList,
      skillsOnSale: data.rooms[d.roomId].skillsOnSale,
      auctionCards: data.rooms[d.roomId].auctionCards,
      players: data.getPlayers(d.roomId),
      itemsOnSale: data.rooms[d.roomId].itemsOnSale,
      placementInfo: data.rooms[d.roomId].placementInfo,
      twoTimesMarket: data.rooms[d.roomId].twoTimesMarket,
      choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
    }
      );
    });


    socket.on('collectorsSendMessage', function(d) {
      data.addMessage(d.roomId, d.playerId, d.msg, d.playerName);
      io.to(d.roomId).emit('collectorsUpdateMessages', {
        messages: data.getMessages(d.roomId)
      })
    });

    socket.on("cancelAction", function(d){
      data.cancelAction(d.roomId, d.playerId, d.placementInfo, d.isPlacedList)
      io.to(d.roomId).emit('collectorsActionCanceld',{
        placements: data.getPlacements(d.roomId),
        isPlacedList: data.rooms[d.roomId].isPlacedList,
        placementInfo: data.rooms[d.roomId].placementInfo,
        skillsOnSale: data.rooms[d.roomId].skillsOnSale,
        itemsOnSale: data.rooms[d.roomId].itemsOnSale,
        auctionCards: data.rooms[d.roomId].auctionCards,
        players: data.getPlayers(d.roomId),
        choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
      })
    });

    socket.on('collectorsStartAuction', function(d) {
      data.startAuction(d.roomId, d.playerId, d.card, d.cost)
      io.to(d.roomId).emit('auctionStarted', {
          playerId: d.playerId,
          players: data.getPlayers(d.roomId),
          auctionCards: data.getAuctionCards(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          currentBid: data.getCurrentBid(d.roomId),
          isPlacedList: data.rooms[d.roomId].isPlacedList,
          choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost
        }
      );
    });
    socket.on('collectorsChangeTwoMarket', function(d){
    data.changeTwoMarket(d.roomId)
    io.to(d.roomId).emit('twoMarketChanged',{
      twoMakrket: data.rooms[d.roomId].twoMarket
    })
    })

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
      data.placeInItems(d.roomId, d.playerId, d.currentAuctionCard, d.moneyPayment, d.winningPlayerHand)
      io.to(d.roomId).emit('auctionCardPlacedInItems', {
          players: data.getPlayers(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId),
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });
    socket.on('collectorsPlaceInSkills', function(d) {
      data.placeInSkills(d.roomId, d.playerId, d.currentAuctionCard, d.moneyPayment, d.winningPlayerHand)
      io.to(d.roomId).emit('auctionCardPlacedInSkills', {
          players: data.getPlayers(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId),
          currentBid: data.getCurrentBid(d.roomId)
        }
      );
    });

    socket.on('collectorsPlaceInMarket',function(d){
      data.placeInMarket(d.roomId, d.playerId, d.currentAuctionCard, d.moneyPayment, d.winningPlayerHand)
      io.to(d.roomId).emit('auctionCardPlacedInMarket', {
          players: data.getPlayers(d.roomId),
          currentAuction: data.getCurrentAuctionCard(d.roomId),
          bidWinnerWrapper: data.getBidWinnerWrapper(d.roomId),
          currentBid: data.getCurrentBid(d.roomId),
          market: data.rooms[d.roomId].market
        }
      );
    })

    socket.on('collectorsRaiseValue', function(d){
      data.raiseMarket(d.roomId, d.playerId, d.card,d.cost,d.action)
      io.to(d.roomId).emit('ValueRaised',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        marketValues: data.rooms[d.roomId].market,
        skillsOnSale: data.rooms[d.roomId].skillsOnSale,
        auctionCards: data.rooms[d.roomId].auctionCards,
        isPlacedList: data.rooms[d.roomId].isPlacedList,
        twoMarket: data.rooms[d.roomId].twoMarket,
        twoTimesMarket: data.rooms[d.roomId].twoTimesMarket,
        choosenPlacementCost: data.rooms[d.roomId].choosenPlacementCost

      })

      });

      socket.on('collectorsWorkers',function(d){
        data.workers(d.roomId,d.playerId,d.cost,d.action)
        io.to(d.roomId).emit('workerPlaced',{
          players: data.getPlayers(d.roomId),
          placements: data.getPlacements(d.roomId),
          isPlacedList: data.rooms[d.roomId].isPlacedList,
          action: d.action
        })
      })

      socket.on('collectorsRaiseIncome', function(d){
        data.raiseIncome(d.roomId,d.playerId,d.card)
        io.to(d.roomId).emit('incomeRaised',{
          players: data.getPlayers(d.roomId),
          discardTwo: data.rooms[d.roomId].discardTwo,
          isPlacedList: data.rooms[d.roomId].isPlacedList
        })
      })

    socket.on('collectorsQuarterTile', function(d){
      data.workerQuarter(d.roomId, d.playerId, d.cost)
      io.to(d.roomId).emit('quarterWorkerPlaced',{
        players: data.getPlayers(d.roomId),
        placements: data.getPlacements(d.roomId),
        isPlacedList: data.rooms[d.roomId].isPlacedList
      })
    })

    socket.on('collectorsChangeTurn',function(d){
      data.changeTurn(d.roomId,d.playerId)
      io.to(d.roomId).emit('turnChanged',{
        playerId: d.playerId,
        players: data.getPlayers(d.roomId)
      });

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
