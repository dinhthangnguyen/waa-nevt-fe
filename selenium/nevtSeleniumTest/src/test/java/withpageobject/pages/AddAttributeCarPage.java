package withpageobject.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AddAttributeCarPage {
	protected WebDriver driver;

	public AddAttributeCarPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	@FindBy(id = "submit-attribute")
	private WebElement submitButton;

	public AddImagesCarPage clickSubmit() {
		submitButton.click();
		return new AddImagesCarPage(driver);
	}

}
