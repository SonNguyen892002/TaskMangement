import { FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { TaskModel } from '../../models/TaskModel';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Container from '../../components/Container';
import TitleComponent from '../../components/TitleComponent';
import TextComponent from '../../components/TextComponent';
import { colors } from '../../constants/colors';
import { HandleDateTime } from '../../util/handleDateTime';
import SpaceComponent from '../../components/SpaceComponent';
import SectionComponent from '../../components/SectionComponent';
import InputComponent from '../../components/InputComponent';
import { SearchNormal1 } from 'iconsax-react-native';

const ListTasks = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<TaskModel[]>([]);

  const user = auth().currentUser;

  useEffect(() => {
    user && getAllTasksByUser();
  }, []);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const items = tasks.filter((element) =>
        element.title.toLowerCase().includes(searchKey.toLowerCase())
      );

      setResults(items);
    }
  }, [searchKey]);

  const getAllTasksByUser = () => {
    const filter = firestore()
      .collection('tasks')
      .where('uids', 'array-contains', user?.uid);

    filter.onSnapshot((snap) => {
      if (snap.empty) {
        console.log('Data not found!!');
      } else {
        const items: TaskModel[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });

        setTasks(items);
      }
    });
  };
  return (
    <Container back title="All your tasks">
      <SectionComponent>
        <InputComponent
          value={searchKey}
          onChange={(val) => setSearchKey(val)}
          prefix={<SearchNormal1 size={20} color={colors.gray2} />}
          placeholder="Search..."
          allowClear
        />
      </SectionComponent>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={searchKey ? results : tasks}
        ListEmptyComponent={
          <SectionComponent>
            <TextComponent text="Data not found!!" />
          </SectionComponent>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TaskDetail', {
                id: item.id,
              })
            }
            style={{
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
          >
            <TitleComponent text={item.title} />
            <TextComponent
              text={item.description}
              size={12}
              color={colors.gray2}
              line={2}
            />
            <SpaceComponent height={8} />
            {item.dueDate && (
              <TextComponent
                text={`Duo date: ${HandleDateTime.DateString(
                  item.dueDate?.toDate()
                )}`}
                size={12}
                color={colors.white}
                line={2}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTasks;
