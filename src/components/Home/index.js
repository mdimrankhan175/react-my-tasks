import {Component} from 'react'
import {v4} from 'uuid'
import {MdDelete} from 'react-icons/md' // Import the delete icon from react-icons/md

import {
  HomeContainer,
  CreateTaskContainer,
  CreateForm,
  FormHeading,
  LabelInputContainer,
  Label,
  Input,
  SelectInput,
  OptionInput,
  Button,
  AddTaskContainer,
  TagsHeading,
  TagsListUl,
  TagsList,
  TagsButton,
  TaskListUl,
  TaskListLi,
  TaskText,
  TaskTag,
  NoTaskText,
  TagDel,
} from './styledComponents'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class Home extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'ALL', // Set default to 'ALL' to show all tasks initially
  }

  changeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.trim() !== '') {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputText: '',
      }))
    }
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value ? 'ALL' : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {inputText, inputTag} = this.state
    return (
      <CreateTaskContainer>
        <CreateForm onSubmit={this.submitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelInputContainer>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              placeholder="Enter the task here"
              onChange={this.changeInput}
              value={inputText}
              id="inputText"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputContainer>
          <Button type="submit">Add Task</Button>
        </CreateForm>
      </CreateTaskContainer>
    )
  }

  deleteTask = taskId => {
    this.setState(prevState => ({
      taskList: prevState.taskList.filter(task => task.id !== taskId),
    }))
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'ALL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TagDel>
              <TaskTag>{each.tag}</TaskTag>
              <button type="button" onClick={() => this.deleteTask(each.id)}>
                <MdDelete /> {/* Use MdDelete icon */}
              </button>
            </TagDel>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state

    return (
      <AddTaskContainer>
        <TagsHeading>Tags</TagsHeading>
        <TagsListUl>
          <TagsList>
            <TagsButton
              type="button"
              value="ALL"
              onClick={this.onClickActiveTag}
              isActive={activeTag === 'ALL'}
            >
              All
            </TagsButton>
          </TagsList>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagsList key={each.optionId}>
                <TagsButton
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagsButton>
              </TagsList>
            )
          })}
        </TagsListUl>
        <TagsHeading>Tasks</TagsHeading>
        <TaskListUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskListUl>
      </AddTaskContainer>
    )
  }

  render() {
    return (
      <HomeContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </HomeContainer>
    )
  }
}

export default Home
