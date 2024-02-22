import { TouchableOpacity, View } from 'react-native';
import {
  Add,
  Edit2,
  Element4,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React from 'react';

import Container from '../../components/Container';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../constants/colors';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import CardComponent from '../../components/CardComponent';
import TagComponent from '../../components/TagComponent';
import SpaceComponent from '../../components/SpaceComponent';
import CircularComponent from '../../components/CircularComponent';
import CardImageComponent from '../../components/CardImageComponent';
import AvatarGroup from '../../components/AvatarGroup';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import { fontFamilies } from '../../constants/fontFamilies';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Container>
        {/* Header section */}
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <TextComponent text="Hi, Json" />
          <TitleComponent text="Be productive today" />
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('Search')}
          >
            <TextComponent color="#69686f" text="Search" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        {/* Task progress section */}
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text="Task progress" />
                <TextComponent text="30/48 task done" />
                <SpaceComponent height={20} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text="March 22"
                    onPress={() => console.log('first')}
                  />
                </RowComponent>
              </View>
              <View>
                <CircularComponent value={80} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

        {/* Card section */}
        <SectionComponent>
          <RowComponent styles={{ alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <CardImageComponent>
                <TouchableOpacity
                  onPress={() => {}}
                  style={globalStyles.iconContainer}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="UX Design" />
                <TextComponent text="task management mobile app" size={13} />
                <View style={{ marginVertical: 28 }}>
                  <AvatarGroup />
                  <ProgressBarComponent
                    percent="70%"
                    color="#0AACFF"
                    size="large"
                  />
                </View>
                <TextComponent
                  text="Due, 2023 Match 03"
                  size={12}
                  color={colors.desc}
                />
              </CardImageComponent>
            </View>
            <SpaceComponent width={16} />
            <View style={{ flex: 1 }}>
              <CardImageComponent color="rgba(33, 150, 243, 0.9)">
                <TouchableOpacity
                  onPress={() => {}}
                  style={globalStyles.iconContainer}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="API Payment" size={18} />
                <View style={{ marginVertical: 28 }}>
                  <AvatarGroup />
                  <ProgressBarComponent percent="40%" color="#A2F068" />
                </View>
              </CardImageComponent>
              <SpaceComponent height={16} />
              <CardImageComponent color="rgba(18, 181, 22, 0.9)">
                <TouchableOpacity
                  onPress={() => {}}
                  style={globalStyles.iconContainer}
                >
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="Update work" />
                <TextComponent text="Revision home page" size={13} />
              </CardImageComponent>
            </View>
          </RowComponent>
        </SectionComponent>

        {/* Urgent task section */}
        <SectionComponent>
          <TextComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          <CardComponent>
            <RowComponent>
              <CircularComponent value={40} radius={36} />
              <View
                style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}
              >
                <TextComponent text="Title of task" />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewTask')}
          activeOpacity={1}
          style={[
            globalStyles.row,
            {
              backgroundColor: 'coral',
              padding: 10,
              borderRadius: 100,
              width: '80%',
            },
          ]}
        >
          <TextComponent text="Add new tasks" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
