import {
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/MovieDb';

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('got trending movies:', data);
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('got upcoming movies:', data);
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('got top rated movies:', data);
    if (data && data.results) {
      setTopRated(data.results);
    }
  };
  return (
    <View className="flex-1 bg-neutral-800 pt-3">
      {/* search bar */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>K</Text>
            atalog <Text style={styles.text}>F</Text>ilm
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* daftar film trending dengan carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* daftar film akan tayang */}
          <MovieList title="Akan Tayang" screen="Upcoming" data={upcoming} />

          {/* daftar film rating tertinggi */}
          <MovieList title="Rating Teratas" screen="TopRated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
