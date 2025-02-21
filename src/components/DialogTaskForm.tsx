import { PlusIcon } from "@radix-ui/react-icons";
import { Badge, Button, Dialog, Flex, Radio, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { FormEventHandler } from "react";
import { z } from "zod";
import { TaskServices } from "../services/api";

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

const DialogTaskForm: React.FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const title = form.get("title");
    const description = form.get("description");
    const status = form.get("status");
    const priority = form.get("priority");

    e.currentTarget.reset();

    const taskSchema = CreateTaskSchema.parse({ title, description, status, priority });
    await TaskServices.create(taskSchema);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> Nova Tarefa
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="30rem">
        <Dialog.Title>Nova Tarefa</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Adicione uma tarefa ao quadro de tarefas
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="2" mb="3">
            <Text as="label" size="3" htmlFor="title">
              Título
            </Text>
            <TextField.Root placeholder="Defina um título" name="title" id="title" autoFocus />
          </Flex>

          <Flex direction="column" gap="1" mb="3">
            <Text as="label" size="3" htmlFor="description">
              Descrição
            </Text>
            <TextArea placeholder="descreva sua tarefa" name="description" id="description" />
          </Flex>

          <Flex gap="6">
            <Flex gap="2" direction="column">
              <Text as="div">Status</Text>
              <Flex align="start" direction="column" gap="1">
                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="status" value="todo" defaultChecked />
                    <Badge color="gray">Para Fazer</Badge>
                  </Text>
                </Flex>

                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="status" value="doing" />
                    <Badge color="yellow">Em Progresso</Badge>
                  </Text>
                </Flex>

                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="status" value="done" />
                    <Badge color="green">Concluída</Badge>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex gap="2" direction="column">
              <Text as="div">Prioridade</Text>
              <Flex align="start" direction="column" gap="1">
                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="priority" value="low" defaultChecked />
                    <Badge color="cyan">Baixa</Badge>
                  </Text>
                </Flex>

                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="priority" value="medium" />
                    <Badge color="orange">Média</Badge>
                  </Text>
                </Flex>

                <Flex asChild gap="2">
                  <Text as="label" size="2">
                    <Radio name="priority" value="high" />
                    <Badge color="ruby">Alta</Badge>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Criar Tarefa</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogTaskForm;
