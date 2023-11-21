package withpageobject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class Page4 {
	protected WebDriver driver;

	public Page4(WebDriver driver) {
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

	@FindBy(id = "card")
	private WebElement cardP;

	@FindBy(id = "cardType")
	private WebElement cardTypeP;

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
	public String getCard() {
		return cardP.getText();
	}
	public String getCardType() {
		return cardTypeP.getText();
	}

}
