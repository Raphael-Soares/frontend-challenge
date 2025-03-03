import {useContext, useMemo} from "react";
import {TasksContext} from "./contexts/Tasks";

import styled from "styled-components";

import DateHeader from "./components/DateHeader";
import ProgressBar from "./components/ProgressBar";
import Search from "./components/Search";
import AddTask from "./components/AddTask";
import List from "./components/List";
import Messages from "./components/Messages";

const Background = styled.main`
    background-color: #555555;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Container = styled.section`
    background-color: #ffffff;
    width: 800px;
    height: 650px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 60px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 800px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding: 24px;
    }
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
`;

const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    max-height: 230px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -12px;
    padding-right: 6px;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 8px;
        background: #e4e4e4;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: #848484;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #848484;
    }
    &::-webkit-scrollbar-thumb:active {
        background: #848484;
    }
`;

function App() {
    const {tasks, pending, completed, search} = useContext(TasksContext);

    const pendingTasks = useMemo(() => {
        return tasks.filter((task) => !task.completed);
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter((task) => task.completed);
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
    }, [tasks, search]);

    const whichTasks = pending ? pendingTasks : completed ? completedTasks : filteredTasks;

    return (
        <Background>
            <Container>
                <Head>
                    <DateHeader />
                    <ProgressBar />

                    <Search />
                    <AddTask />
                </Head>
                <Tasks>
                    <List tasks={whichTasks} />
                </Tasks>
                <Messages completedTasks={completedTasks} searchLength={whichTasks.length} />
            </Container>
        </Background>
    );
}

export default App;
