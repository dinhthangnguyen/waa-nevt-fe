package withpageobject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

public class Page3 {
	protected WebDriver driver;

	public Page3(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	@FindBy(id = "firstName")
	private WebElement firstNameP;

	@FindBy(id = "lastName")
	private WebElement lastNameP;

	@FindBy(id = "profession")
	private WebElement professionP;

	@FindBy(id = "street")
	private WebElement streetP;

	@FindBy(id = "city")
	private WebElement cityP;

	@FindBy(id = "zip")
	private WebElement zipP;

	@FindBy(id = "state")
	private WebElement stateP;

	@FindBy(name = "card")
	private WebElement cardInput;

	@FindBy(id = "visa")
	private WebElement visaOption;

	@FindBy(id = "mastercard")
	private WebElement masterCardOption;


	@FindBy(id = "next")
	private WebElement nextButton;

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public String getFirstname() {
		return firstNameP.getText();
	}

	public String getLastName() {
		return lastNameP.getText();
	}

	public String getProfession() {
		return professionP.getText();
	}

	public String getStreet() {
		return streetP.getText();
	}

	public String getCity() {
		return cityP.getText();
	}

	public String getZip() {
		return zipP.getText();
	}

	public String getState() {
		return stateP.getText();
	}


	public String insertCard (String string) {
		cardInput.sendKeys(string);
		return cardInput.getAttribute("value");
	}



	public void selectCardType(Boolean isVisa) {
		if (isVisa) {
			visaOption.click();
		} else {
			masterCardOption.click();
		}
	}

	public Page4 clickNext() {
		nextButton.click();
		return new Page4(driver);
	}
}
