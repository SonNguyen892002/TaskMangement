import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import CardImageComponent from '../../components/CardImageComponent';
import CircularComponent from '../../components/CircularComponent';
import Container from '../../components/Container';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { TaskModel } from '../../models/TaskModel';
import { globalStyles } from '../../styles/globalStyles';
import { HandleDateTime } from '../../util/handleDateTime';
import TotalTasks from './components/TotalTask';
// import {HandleNotification} from '../../utils/handleNotification';
// import {NotificationModel} from '../../models/NotificationModel';
// import messaging from '@react-native-firebase/messaging';

const date = new Date();

const HomeScreen = ({ navigation }: any) => {
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [urgentTask, setUrgentTask] = useState<TaskModel[]>([]);
  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const items = tasks.filter((element) => element.isUrgent);

      setUrgentTask(items);
    }
  }, [tasks]);

  const handleMoveToTaskDetail = (id?: string, color?: string) =>
    navigation.navigate('TaskDetail', {
      id,
      color,
    });

  const getTasks = () => {
    setIsLoading(true);

    firestore()
      .collection('tasks')
      .where('uids', 'array-contains', user?.uid)
      .onSnapshot((snap) => {
        if (snap.empty) {
          console.log(`tasks not found!`);
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setTasks(items.sort((a, b) => b.createdAt - a.createdAt));
        }
        setIsLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Container isScroll>
        {/* Header */}
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View style={{ flex: 1 }}>
              <TextComponent text={`Hi, ${user?.email?.split('@')[0]}`} />
              <TitleComponent text="Be productive today" />
            </View>
            <TouchableOpacity onPress={async () => auth().signOut()}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>

        {/* Search button */}
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('ListTasks')}
          >
            <TextComponent color="#69686f" text="Search" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        {/* Progress */}
        <TotalTasks />

        {/* Card section */}
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent
              onPress={() => navigation.navigate('ListTasks')}
              styles={{ paddingVertical: 16, justifyContent: 'flex-end' }}
            >
              <TextComponent text="View all" flex={0} />
            </RowComponent>
            <RowComponent styles={{ alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                {tasks[0] && (
                  <CardImageComponent
                    onPress={() =>
                      handleMoveToTaskDetail(tasks[0].id as string)
                    }
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[0],
                        })
                      }
                      style={globalStyles.iconContainer}
                    >
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[0].title} />
                    <TextComponent
                      line={3}
                      text={tasks[0].description}
                      size={13}
                    />
                    <View style={{ marginVertical: 28 }}>
                      <AvatarGroup uids={tasks[0].uids} />
                      {tasks[0].progress &&
                      (tasks[0].progress as number) >= 0 ? (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[0].progress * 100)}%`}
                          color="#0AACFF"
                          size="large"
                        />
                      ) : null}
                    </View>
                    {tasks[0].dueDate && (
                      <TextComponent
                        text={`Due ${HandleDateTime.DateString(
                          tasks[0].dueDate.toDate()
                        )}`}
                        size={12}
                        color={colors.desc}
                      />
                    )}
                  </CardImageComponent>
                )}
              </View>
              <SpaceComponent width={16} />
              <View style={{ flex: 1 }}>
                {tasks[1] && (
                  <CardImageComponent
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[1].id as string,
                        'rgba(33, 150, 243, 0.9)'
                      )
                    }
                    color="rgba(33, 150, 243, 0.9)"
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[1],
                        })
                      }
                      style={globalStyles.iconContainer}
                    >
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[1].title} size={18} />
                    {tasks[1].uids && <AvatarGroup uids={tasks[1].uids} />}
                    {tasks[1].progress ? (
                      <ProgressBarComponent
                        percent={`${Math.floor(tasks[1].progress * 100)}%`}
                        color="#A2F068"
                      />
                    ) : (
                      <></>
                    )}
                  </CardImageComponent>
                )}

                <SpaceComponent height={16} />

                {tasks[2] && (
                  <CardImageComponent
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[2].id as string,
                        'rgba(18, 181, 22, 0.9)'
                      )
                    }
                    color="rgba(18, 181, 22, 0.9)"
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[2],
                        })
                      }
                      style={globalStyles.iconContainer}
                    >
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[2].title} />
                    <TextComponent
                      line={3}
                      text={tasks[2].description}
                      size={13}
                    />
                  </CardImageComponent>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        {/* Urgent task */}
        <SectionComponent>
          <TitleComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          {urgentTask.length > 0 &&
            urgentTask.map((item) => (
              <CardComponent
                onPress={() => handleMoveToTaskDetail(item.id)}
                styles={{
                  marginBottom: 12,
                }}
                key={`urgentTask${item.id}`}
              >
                <RowComponent>
                  <CircularComponent
                    value={item.progress ? item.progress * 100 : 0}
                    radius={36}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 12,
                    }}
                  >
                    <TextComponent text={item.title} />
                  </View>
                </RowComponent>
              </CardComponent>
            ))}
        </SectionComponent>
      </Container>

      <SpaceComponent height={50} />
      {/* Add new task button */}
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
          onPress={() =>
            navigation.navigate('AddNewTask', {
              editable: false,
              task: undefined,
            })
          }
          activeOpacity={1}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
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
