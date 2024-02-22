import React, { useState } from 'react';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import { TaskModel } from '../../models/TaskModel';
import SectionComponent from '../../components/SectionComponent';
import InputComponent from '../../components/InputComponent';
import { Button, View } from 'react-native';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({ navigation }: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);

  const handleChangeValue = (id: string, value: string | Date) => {
    const item: any = { ...taskDetail };
    item[`${id}`] = value;
    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    console.log('first');
  };

  return (
    <Container back title="Add new task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={(val) => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={(val) => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Description of task"
          multiple
          numberOfLine={4}
        />
        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={(val) => handleChangeValue('dueDate', val)}
          placeholder="Choice"
          title="Duo date"
          type="date"
        />
        <RowComponent>
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              onSelect={(val) => handleChangeValue('start', val)}
              title="Start"
              type="time"
            />
          </View>
          <SpaceComponent width={10} />
          <View style={{ flex: 1 }}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={(val) => handleChangeValue('end', val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <Button title="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
