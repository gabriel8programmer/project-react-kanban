import { Badge, Flex, Grid, ScrollArea, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import TaskCard from "./TaskCard";
import { TaskServices } from "../services/api";

const TasksBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    TaskServices.findAll().then((data) => {
      setTasks(data);
    });
  }, [tasks]);

  const tasksTodo: Task[] = tasks.filter((task) => task.status === "todo");
  const tasksInProgress: Task[] = tasks.filter((task) => task.status === "doing");
  const tasksDone: Task[] = tasks.filter((task) => task.status === "done");

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns="3" gap="3" minWidth="60rem">
        <Flex direction="column" gap="2">
          <Badge color="gray">
            <Text size="2" weight="medium">
              Para Fazer ({tasksTodo.length})
            </Text>
          </Badge>

          {tasksTodo.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </Flex>

        <Flex direction="column" gap="2">
          <Badge color="yellow">
            <Text size="2" weight="medium">
              Em Progresso ({tasksInProgress.length})
            </Text>
          </Badge>

          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </Flex>

        <Flex direction="column" gap="2">
          <Badge color="green">
            <Text size="2" weight="medium">
              Concluídas ({tasksDone.length})
            </Text>
          </Badge>

          {tasksDone.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};

export default TasksBoard;
