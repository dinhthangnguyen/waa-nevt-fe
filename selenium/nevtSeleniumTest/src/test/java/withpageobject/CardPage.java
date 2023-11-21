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

	@FindBy(id = "cardTitle")
	private WebElement title;

	@FindBy(name = "number")
	private WebElement numberInput;

	@FindBy(id = "VISA")
	private WebElement visaRadioCheck;

	@FindBy(id = "MASTERCARD")
	private WebElement masterCardRadioCheck;

	@FindBy(name = "validDate")
	private WebElement validDateInput;

	@FindBy(name = "validCode")
	private WebElement validCodeInput;

	@FindBy(id = "cardNext")
	private WebElement nextButton;

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public String getTitle() {
		return title.getText();
	}

	public String insertNumber(String string) {
		numberInput.sendKeys(string);
		return numberInput.getAttribute("value");
	}

	public String selectVisa() {
		visaRadioCheck.click();
		return visaRadioCheck.getAttribute("value");
	}
	public String selectMasterCard() {
		masterCardRadioCheck.click();
		return masterCardRadioCheck.getAttribute("value");
	}

	public String insertDate(String string) {
		validDateInput.sendKeys(string);
		return validDateInput.getAttribute("value");
	}
	public String insertCVV(String string) {
		validCodeInput.sendKeys(string);
		return validCodeInput.getAttribute("value");
	}


	public CheckoutConfirmPage clickNext() {
		nextButton.click();
		return new CheckoutConfirmPage(driver);
	}
}
