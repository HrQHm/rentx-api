import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@sharederrors/AppError";
import { IDateProvider } from "@sharedcontainer/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@sharedcontainer/providers/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private emailProvider: IMailProvider
  ) { }

  async execute(email: string): Promise<void> {
    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    }

    await this.emailProvider.sendMail(email, "Recovery Password",
      variables, templatePath);

  }
}

export { SendForgotPasswordMailUseCase }