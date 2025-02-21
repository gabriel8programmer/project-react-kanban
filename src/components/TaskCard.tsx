import React from "react";
import { PriorityTask, StatusTask, Task } from "../interfaces/Task";
import { Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { TaskServices } from "../services/api";

const TaskCard: React.FC<Task> = ({ id, title, description, status, priority }) => {
  const getPriorityColor = (priority: PriorityTask) => {
    const priorityColors: { [key: string]: "cyan" | "orange" | "red" } = {
      low: "cyan",
      medium: "orange",
      high: "red",
    };

    return priorityColors[priority];
  };

  const getPriorityText = (priority: PriorityTask) => {
    const priorityTexts: { [key: string]: "Baixa" | "Média" | "Alta" } = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
    };

    return priorityTexts[priority];
  };

  const handleDeteteTask = async (id: string) => {
    await TaskServices.delete(id);
  };

  const handlePatchStatus = async (id: string, status: StatusTask) => {
    let nextStatus;

    switch (status) {
      case "todo":
        nextStatus = "doing";
        break;
      case "doing":
        nextStatus = "done";
        break;
    }

    await TaskServices.patch(id, { status: nextStatus });
  };

  return (
    <Card asChild>
      <Box>
        <Flex direction="column" gap="4">
          <Flex gap="5">
            <Heading as="h3" size="4">
              {title}
            </Heading>
            <Badge color={getPriorityColor(priority as PriorityTask)}>
              {getPriorityText(priority as PriorityTask)}
            </Badge>
          </Flex>
          <Text size="2">{description}</Text>
          <Flex gap="3">
            {status !== "done" && (
              <Button
                color={status === "todo" ? "indigo" : "green"}
                onClick={() => handlePatchStatus(id, status as StatusTask)}
              >
                {status !== "todo" ? "Concluir" : "Iniciar"}
              </Button>
            )}
            <Button color="red" onClick={() => handleDeteteTask(id)}>
              Excluir
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default TaskCard;
