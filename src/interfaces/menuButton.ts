export enum MenuButtonType {
    image = "image",
    text = "text"
}
export enum MenuButtonAction {
    scene = "scene",
    method = "method",
    quit = "quit"
}
export interface MenuButton {
    key: string;
    type: MenuButtonType;
    action: MenuButtonAction
    scene?: string;
    method?: string;
    text?: string;
    imageKey?: string;
}