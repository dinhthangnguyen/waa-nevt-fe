package withpageobject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CardPage {
	protected WebDriver driver;

	public CardPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	@FindBy(id = "title")
	private WebElement title;

	@FindBy(name = "name")
	private WebElement nameInput;

	@FindBy(name = "email")
	private WebElement emailInput;

	@FindBy(name = "phone")
	private WebElement phoneInput;

	@FindBy(name = "street")
	private WebElement streetInput;

	@FindBy(name = "city")
	private WebElement cityInput;

	@FindBy(name = "zip")
	private WebElement zipInput;

	@FindBy(id = "add-card")
	private WebElement addCardButton;

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public String getTitle() {
		return title.getText();
	}

	public String insertName(String string) {
		nameInput.sendKeys(string);
		return nameInput.getAttribute("value");
	}
	public String insertEmail(String string) {
		emailInput.sendKeys(string);
		return emailInput.getAttribute("value");
	}
	public String insertPhone(String string) {
		phoneInput.sendKeys(string);
		return phoneInput.getAttribute("value");
	}
	public String insertStreet(String string) {
		streetInput.sendKeys(string);
		return streetInput.getAttribute("value");
	}

	public String insertCity(String string) {
		cityInput.sendKeys(string);
		return cityInput.getAttribute("value");
	}
	public String insertZip(String string) {
		zipInput.sendKeys(string);
		return zipInput.getAttribute("value");
	}


	public Page3 clickNext() {
		addCardButton.click();
		return new Page3(driver);
	}
}
