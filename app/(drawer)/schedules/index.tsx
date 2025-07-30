import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Lines } from '@/constants/Lines';
import apiClient from '@/util/apiClient';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import NavetteGareIcon from '@/components/icons/NavetteGareIcon';
import NavetteOvalieIcon from '@/components/icons/NavetteOvalieIcon';
import NavetteAmigoIcon from '@/components/icons/NavetteAmigoIcon';
import { router, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LineIcon from '@/components/icons/LineIcon';

export default function LinesPage() {
  const [tramLines, setTramLines] = useState([]);
  const [urbanBuses, setUrbanBuses] = useState([]);
  const [extraUrbanBuses, setExtraUrbanBuses] = useState([]);
  const [touchableDisabled, setTouchableDisabled] = useState(false);

  const navigation = useNavigation();

  const fetchLines = async () => {
    try {
      const response = await apiClient.get('/lignes');
      const { data } = response;

      const trams = data.filter((line: any) => line.type === 'tramway');
      const urbanBuses = data.filter(
        (line: any) =>
          line.type === 'bus' && Lines.urbanIds.includes(parseInt(line.id))
      );
      const extraUrbanBuses = data.filter(
        (line: any) =>
          line.type === 'bus' && Lines.extraUrbanIds.includes(parseInt(line.id))
      );

      setTramLines(trams);
      setUrbanBuses(urbanBuses);
      setExtraUrbanBuses(extraUrbanBuses);
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  const handleNavigation = (id: number) => {
    router.push({
      pathname: 'schedules/[id]',
      params: { id },
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      console.log('test', e);
    });
  }, [navigation]),
    useEffect(() => {
      fetchLines();
    }, []);

  return (
    <ScrollView
      className="flex flex-col"
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Button to select a specific stop */}
      <TouchableHighlight
        underlayColor="#1659c7"
        className="flex flex-row justify-center items-enter w-72 p-2 mt-6 bg-blue-500 rounded-3xl"
      >
        <View className="flex flex-row items-center">
          <Text className="font-bold text-xl text-white">Choisir un arrêt</Text>
          <AntDesign
            name="arrowright"
            className="ml-3"
            size={28}
            color="white"
          />
        </View>
      </TouchableHighlight>

      {/* List of all available lines */}
      <View className="flex flex-col w-full space-y-12 mt-4 p-3">
        <View className="flex flex-col">
          <View className="flex flex-row items-center w-full border-gray-400 border-b-[1px]">
            <MaterialIcons name="tram" size={24} color="black" />
            <Text className="text-xl font-bold text-gray-800">Tramways</Text>
          </View>
          <View className="flex flex-wrap flex-row p-2 gap-2">
            {tramLines.map((tram: any, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  router.push({
                    pathname: 'schedules/[id]',
                    params: { id: tram.id },
                  })
                }
              >
                <LineIcon lineId={tram.id} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex flex-col space-y-2">
          <View className="flex flex-row items-center w-full border-gray-400 border-b-[1px]">
            <FontAwesome5 name="bus" className="ml-1" size={16} color="black" />
            <Text className="ml-2 text-xl font-bold text-gray-800">
              Bus interurbains
            </Text>
          </View>
          <View className="flex flex-wrap flex-row p-2 gap-2">
            {urbanBuses.map((tram: any, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  router.push({
                    pathname: 'schedules/[id]',
                    params: { id: tram.id },
                  })
                }
              >
                <LineIcon lineId={tram.id} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex flex-col space-y-2">
          <View className="flex flex-row items-center w-full border-gray-400 border-b-[1px]">
            <FontAwesome5 name="bus" className="ml-1" size={16} color="black" />
            <Text className="ml-2 text-xl font-bold text-gray-800">
              Bus extra-urbains
            </Text>
          </View>
          <View className="flex flex-wrap flex-row p-2 gap-2">
            {extraUrbanBuses.map((tram: any, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  router.push({
                    pathname: 'schedules/[id]',
                    params: { id: tram.id },
                  })
                }
              >
                <LineIcon lineId={tram.id} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex flex-col space-y-2">
          <View className="flex flex-row items-center w-full border-gray-400 border-b-[1px]">
            <FontAwesome5
              name="bus-alt"
              className="ml-1"
              size={16}
              color="black"
            />
            <Text className="ml-2 text-xl font-bold text-gray-800">
              Navettes
            </Text>
          </View>
          <View className="flex flex-wrap flex-row p-2 gap-2">
            {/* Navette Gare */}
            <TouchableOpacity onPress={() => handleNavigation(50)}>
              <View className="flex flex-row justify-center items-center py-2 px-6 h-12 bg-[#004496] rounded-full">
                <NavetteGareIcon width={20} height={20} color="white" />
                <Text className="ml-3 text-white text-xl mt-0 font-bold text-center">
                  Navette Gare
                </Text>
              </View>
            </TouchableOpacity>

            {/* Navette Ovalie */}
            <TouchableOpacity onPress={() => handleNavigation(96)}>
              <View className="flex flex-row justify-center items-center py-2 px-6 h-12 bg-[#004a98] rounded-full">
                <NavetteOvalieIcon width={25} height={25} color="white" />
                <Text className="ml-3 text-white text-xl mt-0 font-bold text-center">
                  Navette Ovalie
                </Text>
              </View>
            </TouchableOpacity>

            {/* Navette Amigo */}
            <View className="flex flex-row justify-center items-center py-2 px-4 h-12 bg-[#221f57] rounded-lg">
              <NavetteAmigoIcon width={25} height={25} color="#FDF8A3" />
              <Text className="ml-3 text-[#FDF8A3] text-xl mt-0 font-bold text-center">
                Amigo
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
