import {
    Input,
    Tree,
    Table,
    Button,
    Tabs,
    Modal,
    Radio,
    Form,
    Row,
    Col,
    Menu,
    Dropdown,
    Upload,
    Select,
    Checkbox,
    DatePicker,
    Calendar,
    Pagination,
    Popconfirm,
    message,
    notification,
    // LocaleProvider,
    ConfigProvider,
    AutoComplete,
    // Description,
    // Layout,
    InputNumber,
    // Switch,
    Card,
    Badge,
    Collapse,
    // Popover,
    // List,
    // Avatar,
    // Breadcrumb,
    // Steps,
    Spin,
    Drawer,
    Tooltip,
    TreeSelect,
    Transfer,
    Empty,
    // Alert,
    // Tag,
    // Divider,
    TimePicker,
    // Progress,
    // Skeleton,
} from 'ant-design-vue'

const ant = {
    install(Vue: any) {

        Vue.use(Input)
        Vue.use(Tree)
        Vue.use(Button)
        Vue.use(Table)
        Vue.use(Tabs)
        Vue.use(Modal)
        Vue.use(Radio)
        Vue.use(Form)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Menu)
        Vue.use(Dropdown)
        Vue.use(Upload)
        Vue.use(Select)
        Vue.use(Checkbox)
        Vue.use(DatePicker)
        Vue.use(Calendar)
        Vue.use(Pagination)
        Vue.use(Popconfirm)
        Vue.use(notification)
        // Vue.use(LocaleProvider)
        Vue.use(ConfigProvider)
        Vue.use(AutoComplete)
        // Vue.use(Description)
        // Vue.use(Layout)
        Vue.use(InputNumber)
        // Vue.use(Switch)
        Vue.use(Card)
        Vue.use(Badge)
        Vue.use(Collapse)
        // Vue.use(Popover)
        // Vue.use(List)
        // Vue.use(Avatar)
        // Vue.use(Breadcrumb)
        // Vue.use(Steps)
        Vue.use(Spin)
        Vue.use(Drawer)
        Vue.use(Tooltip)
        Vue.use(TreeSelect)
        Vue.use(Transfer)
        Vue.use(Empty)
        // Vue.use(Alert)
        // Vue.use(Tag)
        // Vue.use(Divider)
        Vue.use(TimePicker)
        // Vue.use(Progress)
        // Vue.use(Skeleton)

        message.config({
            top: ``,
            duration: 2,
            maxCount: 3,
        });
        Vue.config.globalProperties.$confirm = Modal.confirm
        Vue.config.globalProperties.$message = message
        Vue.config.globalProperties.$notification = notification
        Vue.config.globalProperties.$info = Modal.info
        Vue.config.globalProperties.$success = Modal.success
        Vue.config.globalProperties.$error = Modal.error
        Vue.config.globalProperties.$warning = Modal.warning
    }
}

export default ant