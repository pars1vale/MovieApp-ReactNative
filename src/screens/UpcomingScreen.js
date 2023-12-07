import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import {debounce} from 'lodash';
import {
  fallbackMoviePoster,
  fetchSearchMovies,
  fetchUpcomingMovies,
  image185,
} from '../api/MovieDb';
import ProgressiveImage from 'rn-progressive-image';
import {theme} from '../theme';

const {width, height} = Dimensions.get('window');

export default function UpcomingScreen() {
  const navigation = useNavigation();
  const [upcoming, setUpcoming] = useState([]);
  const [page, setNextPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    setNextPage(prevPage => prevPage + 1);
    getUpcomingMovies();
  }, []);
  const getUpcomingMovies = async () => {
    try {
      setLoadMore(true); // Set fetching state to true when starting to fetch more data
      const data = await fetchUpcomingMovies({page});
      // console.log(page);
      if (data && data.results) {
        setUpcoming(prevUpcoming => [...prevUpcoming, ...data.results]);
      }
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };
  const debouncedGetUpcomingMovies = useCallback(
    debounce(getUpcomingMovies, 500), // Wait for 500 ms
    [getUpcomingMovies],
  );
  const handleScrollDebounced = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      !loadMore &&
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    ) {
      setNextPage(prevPage => prevPage + 1);
      debouncedGetUpcomingMovies();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let movieName = 'Equalizer 3';
  return (
    <View className="bg-neutral-800 flex-1 pt-2">
      <SafeAreaView
        className="flex-row mb-5 mt-2"
        style={{paddingHorizontal: 15}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={30} strokeWidth={2} color={theme.text} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : upcoming.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-3"
          onScroll={handleScrollDebounced}>
          <View
            className="flex-row justify-between flex-wrap"
            style={{paddingHorizontal: 15}}>
            {upcoming.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View className="space-y-2 mb-4 items-center">
                    <ProgressiveImage
                      className="rounded-3xl"
                      //   source={require('../../assets/images/moviePoster2.jpeg')}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{width: width * 0.44, height: height * 0.3}}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          {loadMore ? (
            <View
              style={{
                width: '100%',
                height: 60,
                backgroundColor: theme.background,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>Load More...</Text>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </View>
  );
}
