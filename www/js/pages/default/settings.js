var settingsPage = {}
settingsPage.ID = "settings"

settingsPage.updateStatusList = [
    { id: "auto", name: "Auto" },
    { id: "ask-to-me", name: "Ask to me" },
    { id: "off", name: "Off" }
]

settingsPage.languageList = [
    { id: "en", name: "English" },
    { id: "pt", name: "Português" },
    { id: "fr", name: "Français" },
]

settingsPage.createInDefaultViewAndShow = function() {

    if (settingsPage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
            // Out of this function, use "settingsPage.box" for "box".
        settingsPage.box = box

        navigationBar.setVisible(1)
        navigationBar.setTitle("Settings")
        navigationBar.backButton.setVisible(0)
        navigationBar.menuButton.setVisible(0)
        tabBar.setVisible(1)
        tabBar.selectItemByPageId(settingsPage.ID)
        defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)

        box.color = "whitesmoke"
            //SelectText.setSelectedColor("#CADAE0")
            //SelectText.setUIBackgroundColor("white")
        SelectText.setSearchInfoText("Filter")

        // UI STEPPER: Team size.
        box.teamSize = settingsPage.createUIStepperWithTitle("Team Size")
        box.add(that)
        that.uiStepper.id = "teamSize"
        that.uiStepper.setMinNumber(1)
        that.uiStepper.setMaxNumber(10)
        that.uiStepper.onChange(settingsPage.printStepperNumber)
        that.uiStepper.setValue(global.settings[that.uiStepper.id])

        // UI SELECT TEXT: Language.
        box.languageGroup = settingsPage.createUISelectTextWithTitle("Language")
        box.add(that)
        that.uiSelectText.id = "language"
        that.uiSelectText.createItemsByDataList(settingsPage.languageList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])

        defaultView.pushIntoOpenedPageList(settingsPage)
        defaultView.setVisible(1)
        print("Opened page id: " + settingsPage.ID)
    }
}

settingsPage.printSelectedName = function(self) {
    print("Selected name (" + self.id + "): " + self.itemList[self.getSelectedIndex()].name)
    global.settings[self.id + "Index"] = self.getSelectedIndex()
    global.settings[self.id + "Name"] = self.itemList[self.getSelectedIndex()].name
    saveGlobal()
}

settingsPage.printStepperNumber = function(self) {
    print("Stepper number (" + self.id + "): " + self.getValue())
    global.settings[self.id] = self.getValue()
    saveGlobal()
}

// UI SELECT TEXT IN GROUP BOX
settingsPage.createUISelectTextWithTitle = function(titleText) {

    // BOX: object container
    var box = settingsPage.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiSelectText = createSelectText()
    box.add(that)
    that.right = 20
    that.top = 10
    that.setAutoResize(1)
        //that.color = "whitesmoke"
        //that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)"
    that.color = "white"
    that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, white)"

    makeBasicObject(box)
    return box
}

// UI STEPPER IN GROUP BOX
settingsPage.createUIStepperWithTitle = function(titleText) {

    // BOX: object container
    var box = settingsPage.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiStepper = createUIStepper()
    box.add(that)
    that.right = 20
    that.imgDecrease.color = "rgba(0,0,0,0.05)"
    that.imgIncrease.color = "rgba(0,0,0,0.05)"
    that.center("top")

    makeBasicObject(box)
    return box
}

// CREATE GROUP BOX
settingsPage.createBoxWithLeftTitle = function(titleText) {

    // BOX: object container
    var box = createBox(0, 0, global.USED_WIDTH, 70)
    that.color = "white"
    that.borderColor = "lightgray"
    that.element.style.borderBottomWidth = "1px"
    that.element.style.position = "relative"

    // LABEL: object title text
    box.lblTitle = createLabel(20, 22, "auto")
    box.add(that)
    that.text = titleText
    that.fontSize = 20

    makeBasicObject(box)
    return box
}