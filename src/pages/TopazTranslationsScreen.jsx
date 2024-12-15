import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import TopazHeader from '../components/TopazHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopazHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100, marginTop: 15}}>
        {renderBroadcast(
          'NBA',
          '02.01 00:45',
          'Miami Heat ' + ' San Antonio Spurs',
        )}
        {renderBroadcast(
          'NFL',
          '05.01 23:15',
          'New England Patriot ' + ' Pittsburgh Steelers',
        )}
        {renderBroadcast(
          'MLB',
          '08.01 20:40',
          'Chicago Cubs ' + ' St. Louis Cardinals',
        )}
        {renderBroadcast(
          'NHL',
          '10.01 03:00',
          'Toronto Maple Leafs  ' + ' Montreal Canadiens',
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
  },
  league: {
    fontSize: 40,
    fontFamily: FONTS.black,
    color: COLORS.black,
    width: 100,
    paddingVertical: 8,
  },
  leagueContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  teamsContainer: {
    width: '100%',
  },
  matchTime: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'left',
    width: '60%',
    marginLeft: 15,
  },
  teams: {
    textAlign: 'left',
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.black,
    marginTop: 5,
    marginLeft: 5,
  },
});
