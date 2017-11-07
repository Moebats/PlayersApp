import React, { Component } from 'react';
import { Container, Tab, Tabs, Header } from 'native-base';
import PlayersList from './PlayerList';
import MatchList from './MatchList';

class UserMain extends Component {
    render() {
        return (
            <Container>
            <Header hasTabs />
            <Tabs>
                <Tab heading="PlayersList">
                    <PlayersList />
                </Tab>
                <Tab heading="Matches">
                    <MatchList />
                </Tab>
            </Tabs>
            </Container>
        );
    }
}

export default UserMain;
