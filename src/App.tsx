import { Box, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import DialogTaskForm from "./components/DialogTaskForm";
import TasksBoard from "./components/TasksBoard";

const App: React.FC = () => {
  return (
    <Box maxWidth="80rem" mx="auto" px="3" py="5">
      <Flex gap="4" mb="4" align="center">
        <Heading as="h1" size="8" weight="light">
          React Kanban
        </Heading>
        <DialogTaskForm />
      </Flex>

      <Box>
        <Heading as="h2" size="6" mb="2">
          Quadro de Tarefas
        </Heading>
        <TasksBoard />
      </Box>
    </Box>
  );
};

export default App;
