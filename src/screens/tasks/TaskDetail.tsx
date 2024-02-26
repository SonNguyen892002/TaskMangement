import { Slider } from '@miblanchard/react-native-slider';
import firestore from '@react-native-firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
} from 'iconsax-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AvatarGroup from '../../components/AvatarGroup';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { Attachment, TaskModel } from '../../models/TaskModel';
import { calcFileSize } from '../../util/calcFileSize';
import { HandleDateTime } from '../../util/handleDateTime';

const TaskDetail = ({ navigation, route }: any) => {
  const { id, color }: { id: string; color?: string } = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [subTask, setSubTask] = useState<any[]>([]);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    getTaskDetail();
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress ?? 0);
      if (taskDetail.attachments != undefined) {
        setAttachments(taskDetail.attachments);
      }
    }
  }, [taskDetail]);

  useEffect(() => {
    if (attachments) {
      if (
        progress !== taskDetail?.progress ||
        attachments !== taskDetail.attachments
      ) {
        setIsChange(true);
      } else {
        setIsChange(false);
      }
    }
  }, [progress, attachments, taskDetail]);

  const getTaskDetail = () => [
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({
            id,
            ...snap.data(),
          });
        }
      }),
  ];

  const handleUpdateTask = async () => {
    const data = {
      ...taskDetail,
      progress,
      attachments,
      updatedAt: Date.now(),
    };
    await firestore()
      .doc(`tasks/${id}`)
      .update(data)
      .then(() => Alert.alert('Updated task', 'Task update successful'))
      .catch((err) => console.log(err));
  };

  return taskDetail ? (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.bgColor }}>
        <StatusBar hidden />
        {/* Task Header detail */}
        <SectionComponent
          color={color ?? 'rgba(113, 77, 217, 0.9)'}
          styles={{
            paddingVertical: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <RowComponent styles={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2
                size={28}
                color={colors.white}
                style={{ marginTop: -8, marginRight: 12 }}
              />
            </TouchableOpacity>
            <TitleComponent flex={1} text={taskDetail.title} size={22} />
          </RowComponent>
          <View style={{ marginTop: 20 }}>
            <TextComponent text="Due date" />
            <RowComponent
              styles={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RowComponent
                styles={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}
              >
                <Clock size={20} color={colors.white} />
                <SpaceComponent width={4} />
                {taskDetail.end && taskDetail.start && (
                  <TextComponent
                    flex={0}
                    text={`${HandleDateTime.GetHour(
                      taskDetail.start?.toDate()
                    )} - ${HandleDateTime.GetHour(taskDetail.end?.toDate())}`}
                  />
                )}
              </RowComponent>
              <RowComponent
                styles={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <CalendarEdit size={20} color={colors.white} />
                <SpaceComponent width={4} />

                {taskDetail.dueDate && (
                  <TextComponent
                    flex={0}
                    text={
                      HandleDateTime.DateString(taskDetail.dueDate.toDate()) ??
                      ''
                    }
                  />
                )}
              </RowComponent>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}
              >
                <AvatarGroup uids={taskDetail.uids} />
              </View>
            </RowComponent>
          </View>
        </SectionComponent>

        {/* Task description */}
        <SectionComponent>
          <TitleComponent text="Description" size={22} />
          <CardComponent
            bgColor={colors.bgColor}
            styles={{
              borderWidth: 1,
              borderColor: colors.gray,
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            <TextComponent
              text={taskDetail.description}
              styles={{ textAlign: 'justify' }}
            />
          </CardComponent>
        </SectionComponent>

        {/* Task upload file */}
        <SectionComponent>
          <RowComponent>
            <TitleComponent text="Files & Links" flex={1} />
            <UploadFileComponent
              onUpload={(file) => {
                file && setAttachments((prev) => [...prev, file]);
              }}
            />
          </RowComponent>
          {attachments &&
            attachments.map((item, index) => (
              <View
                style={{ justifyContent: 'flex-start', marginBottom: 8 }}
                key={`attachment${index}`}
              >
                <TextComponent flex={0} text={item.name} />
                <TextComponent
                  flex={0}
                  text={calcFileSize(item.size)}
                  size={12}
                />
              </View>
            ))}
        </SectionComponent>

        {/* Progress */}
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.success,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: colors.success,
                  width: 16,
                  height: 16,
                  borderRadius: 100,
                }}
              />
            </View>
            <TextComponent
              flex={1}
              text="Progress"
              font={fontFamilies.medium}
              size={18}
            />
          </RowComponent>
          <SpaceComponent height={12} />
          <RowComponent>
            <View style={{ flex: 1 }}>
              <Slider
                value={progress}
                onValueChange={(val) => setProgress(val[0])}
                thumbTintColor={colors.success}
                thumbStyle={{
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                maximumTrackTintColor={colors.gray2}
                minimumTrackTintColor={colors.success}
                trackStyle={{ height: 10, borderRadius: 5 }}
              />
            </View>
            <SpaceComponent width={20} />
            <TextComponent
              text={`${Math.floor(progress * 100)}%`}
              font={fontFamilies.bold}
              size={18}
              flex={0}
            />
          </RowComponent>
        </SectionComponent>

        {/* Sub task */}
        <SectionComponent>
          <RowComponent>
            <TitleComponent flex={1} text="Sub tasks" size={20} />
            <TouchableOpacity>
              <AddSquare size={24} color={colors.success} variant="Bold" />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent height={12} />
          {/* {Array.from({ length: 3 }).map((item, index) => (
            <CardComponent
              key={`subtask${index}`}
              styles={{ marginBottom: 12 }}
            >
              <RowComponent>
                <TickCircle variant="Bold" color={colors.success} size={22} />
                <SpaceComponent width={8} />
                <TextComponent text="fafa" />
              </RowComponent>
            </CardComponent>
          ))} */}
        </SectionComponent>
      </ScrollView>
      {isChange && (
        <View style={{ position: 'absolute', bottom: 20, right: 20, left: 20 }}>
          <ButtonComponent text="Update" onPress={handleUpdateTask} />
        </View>
      )}
    </>
  ) : (
    <></>
  );
};

export default TaskDetail;
